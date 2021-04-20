import JSZip from "jszip";
import FileSaver from "file-saver";
export function generateTemplate(templateObject) {
  // const title = templateObject.title
  var yachtAppList = [];

  // Deep Clone templateObject so changing attributes here doesn't affect the form
  var _templateObject = JSON.parse(JSON.stringify(templateObject));
  for (let app in _templateObject.containers) {
    if (
      _templateObject.containers[app].ports &&
      _templateObject.containers[app].ports.length > 0
    ) {
      _templateObject.containers[app].ports = convPorts(
        _templateObject.containers[app].ports
      );
    }
    if (
      _templateObject.containers[app].volumes &&
      _templateObject.containers[app].volumes.length > 0
    ) {
      _templateObject.containers[app].volumes = convVolumes(
        _templateObject.containers[app].volumes
      );
    }
    if (
      _templateObject.containers[app].sysctls &&
      _templateObject.containers[app].sysctls.length > 0
    ) {
      _templateObject.containers[app].sysctls = convSysctls(
        _templateObject.containers[app].sysctls
      );
    }
    yachtAppList.push(_templateObject.containers[app]);
  }
  let zip = new JSZip();
  zip.file(
    _templateObject.title + "-yacht.json",
    JSON.stringify(yachtAppList, null, 2)
  );
  zip.generateAsync({ type: "blob" }).then(function(content) {
    FileSaver.saveAs(content, _templateObject.title + ".zip");
  });
}

function convPorts(ports) {
  var _port_list = [];
  var _port_object = {};
  for (let port in ports) {
    if (ports[port].hport) {
      _port_object[
        ports[port].label
      ] = `${ports[port].hport}:${ports[port].cport}/${ports[port].proto}`;
    } else {
      _port_object[
        ports[port].label
      ] = `${ports[port].cport}/${ports[port].proto}`;
    }
  }
  _port_list.push(_port_object);
  return _port_list;
}

function convVolumes(volumes) {
  var _volume_list = [];
  for (let volume in volumes) {
    let _volume = volumes[volume];
    if (volumes[volume].variable) {
      _volume.bind = volumes[volume].variable;
      delete _volume.variable;
    } else {
      delete _volume.variable;
    }
    _volume_list.push(_volume);
  }
  return _volume_list;
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
