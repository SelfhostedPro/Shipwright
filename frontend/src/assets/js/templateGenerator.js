import JSZip from "jszip";
import FileSaver from "file-saver";
export function generateTemplate(templateObject) {
  // const title = templateObject.title
  // Deep Clone templateObject so changing attributes here doesn't affect the form
  var _yachtTemplateObject = JSON.parse(JSON.stringify(templateObject));
  var _portainerTemplateObject = JSON.parse(JSON.stringify(templateObject));

  let yachtAppList = convYacht(_yachtTemplateObject);
  let portainerAppList = convPortainer(_portainerTemplateObject);
  let portainerV2AppListApps = JSON.parse(JSON.stringify(portainerAppList));
  let portainerV2Template = { version: "2", templates: portainerV2AppListApps };

  let zip = new JSZip();
  zip.file(
    _yachtTemplateObject.title + "-yacht.json",
    JSON.stringify(yachtAppList, null, 2)
  );
  zip.file(
    _portainerTemplateObject.title + "-portainer-v1.json",
    JSON.stringify(portainerAppList, null, 2)
  );
  zip.file(
    _portainerTemplateObject.title + "-portainer-v2.json",
    JSON.stringify(portainerV2Template, null, 4)
  );
  zip.file(
    templateObject.title + "-export.json",
    JSON.stringify(templateObject, null, 2)
  )
  zip.generateAsync({ type: "blob" }).then(function(content) {
    FileSaver.saveAs(content, templateObject.title + ".zip");
  });
}

function convPorts(ports, app) {
  var _port_list = [];
  // Convert ports for Yacht
  if (app === "yacht") {
    for (let port in ports) {
      // If host port then you need to include that
      if (ports[port].hport) {
        // If there's a label make sure to convert it to an object
        if (ports[port].label && ports[port].label.length > 0) {
          let _port_object = {}
          _port_object[
            ports[port].label
          ] = `${ports[port].hport}:${ports[port].cport}/${ports[port].proto}`;
          _port_list.push(_port_object)
        } else {
          _port_list.push(
            `${ports[port].hport}:${ports[port].cport}/${ports[port].proto}`
          );
        }
      } else {
        if (ports[port].label && ports[port].label.length > 0) {
          let _port_object = {}
          _port_object[
            ports[port].label
          ] = `${ports[port].cport}/${ports[port].proto}`;
          _port_list.push(_port_object)
        } else {
          _port_list.push(`${ports[port].cport}/${ports[port].proto}`);
        }
      }
    }
  } else if (app === "portainer_v1") {
    for (let port in ports) {
      if (ports[port].hport) {
        _port_list.push(
          `${ports[port].hport}:${ports[port].cport}/${ports[port].proto}`
        );
      } else {
        _port_list.push(`${ports[port].cport}/${ports[port].proto}`);
      }
    }
  }
  return _port_list;
}

function convVolumes(volumes, app) {
  var _volume_list = [];
  for (let volume in volumes) {
    let _volume = volumes[volume];
    if (volumes[volume].variable && app == "yacht") {
      _volume.bind = volumes[volume].variable;
      delete _volume.variable;
    } else {
      delete _volume.variable;
    }
    _volume_list.push(_volume);
  }
  return _volume_list;
}

function convPortainer(templateObject) {
  var portainerAppList = [];
  for (let app in templateObject.containers) {
    templateObject.containers[app]["type"] = 1;
    if (
      templateObject.containers[app].ports &&
      templateObject.containers[app].ports.length > 0
    ) {
      templateObject.containers[app].ports = convPorts(
        templateObject.containers[app].ports,
        "portainer_v1"
      );
    }
    if (
      templateObject.containers[app].volumes &&
      templateObject.containers[app].volumes.length > 0
    ) {
      templateObject.containers[app].volumes = convVolumes(
        templateObject.containers[app].volumes,
        "portainer_v1"
      );
    }
    if (
      templateObject.containers[app].sysctls &&
      templateObject.containers[app].sysctls.length > 0
    ) {
      templateObject.containers[app].sysctls = convSysctls(
        templateObject.containers[app].sysctls,
        "portainer_v1"
      );
    }
    for (let attribute in templateObject.containers[app]) {
      if (templateObject.containers[app][attribute] === null || templateObject.containers[app][attribute] === undefined || templateObject.containers[app][attribute].length === 0) {
        delete templateObject.containers[app][attribute]
      }
    }
    portainerAppList.push(templateObject.containers[app]);
  }
  return portainerAppList;
}
function convYacht(templateObject) {
  var yachtAppList = [];
  for (let app in templateObject.containers) {
    if (
      templateObject.containers[app].ports &&
      templateObject.containers[app].ports.length > 0
    ) {

      templateObject.containers[app].ports = convPorts(
        templateObject.containers[app].ports,
        "yacht"
      );
    }
    if (
      templateObject.containers[app].volumes &&
      templateObject.containers[app].volumes.length > 0
    ) {
      templateObject.containers[app].volumes = convVolumes(
        templateObject.containers[app].volumes,
        "yacht"
      );
    }
    if (
      templateObject.containers[app].sysctls &&
      templateObject.containers[app].sysctls.length > 0
    ) {
      templateObject.containers[app].sysctls = convSysctls(
        templateObject.containers[app].sysctls,
        "yacht"
      );
    }
    yachtAppList.push(templateObject.containers[app]);
  }
  return yachtAppList;
}
function convSysctls(sysctls) {
  var _sysctl_list = [];
  for (let sysctl in sysctls) {
    let _sysctl_object = {};
    let _sysctl_name = sysctls[sysctl].name;
    let _sysctl_value = sysctls[sysctl].value;
    _sysctl_object[_sysctl_name] = _sysctl_value;
    _sysctl_list.push(_sysctl_object);
  }
  return _sysctl_list;
}
