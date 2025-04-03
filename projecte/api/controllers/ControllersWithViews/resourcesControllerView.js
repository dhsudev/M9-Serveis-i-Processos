import logServices from "../../services/logServices.js";
import GenericControllerView from "./genericControllerView.js";

class ResourceControllerView extends GenericControllerView {
  constructor() {
    super("resource");
    this.propstext = "name, status and properties (must be an array)";
  }
  
  parseData(data) {
    logServices.info(`Parsing data of properties ${this.entityName}`);

    logServices.info(`Cheching if name, status and properties are not empty`);
    if (!data.name || !data.name.trim()) return null;
    if (!data.status || !data.status.trim()) return null;
    if (!Array.isArray(data.properties)) return null;
    logServices.success(`Data parsed successfully`);
    return data;
  }
}

export default ResourceControllerView;