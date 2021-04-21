export async function importTemplate(templateFile) {
  let templateContent = JSON.parse(await _readTemplate(templateFile));
  if (templateContent.title){
      return templateContent
  } else {
      console.error("This file isn't from a Shipwright Export")
  }
}

export async function importPortainer(templateFile) {
    let templateContent = JSON.parse(await _readTemplate(templateFile));
    var convertedTemplate = []

    if (templateContent['version']){
        convertedTemplate = portainerV2Conversion(templateContent)
    } else {
        convertedTemplate = portainerV1Conversion(templateContent)
    }
    return convertedTemplate
  }

function portainerV1Conversion(templateContent){
    var app_list = []
    for(let app in templateContent){
        var _template_skeleton = {
            title: "",
            name: "",
            image: "",
            description: "",
            categories: [],
            platform: "linux",
            note: "",
            restart_policy: "",
            ports: [],
            volumes: [],
            env: [],
            command: [],
            devices: [],
            labels: [],
            sysctls: [],
            cap_add: [],
        }
        if (templateContent[app].ports){
            templateContent[app].ports = portainerPorts(templateContent[app].ports)
        }
        if (templateContent[app].sysctls){
            templateContent[app].sysctls = portainerSysctls(templateContent[app.sysctls])
        }
        Object.assign(_template_skeleton, templateContent[app])
        app_list.push(_template_skeleton)
    }
    return app_list
}
function portainerSysctls(sysctls){
    var sysctl_list = []
    for (let sysctl in sysctls){
        let _sysctl = {'name': sysctl, 'values':sysctls[sysctl]}
        sysctl_list.push(_sysctl)
    }
}
function portainerPorts(ports){
    var port_list = []
    for (let port in ports){
        if (ports[port].includes(':')){
            let _port = ports[port].split(':')
            let hport = _port[0]
            let cport = _port[1].split('/')[0]
            let proto = _port[1].split('/')[1]
            port_list.push({"hport": hport, "cport": cport, "proto":proto})
        } else {
            let _port = ports[port].split('/')
            let cport = _port[0]
            let proto = _port[1]
            port_list.push({"cport": cport, "proto":proto})
        }
    }
    return port_list
}

function portainerV2Conversion(_templateContent){
    let templateContent = _templateContent['templates']
    portainerV1Conversion(templateContent)
}





















function _readTemplate(templateFile) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(templateFile);
  });
}
