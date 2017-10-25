import * as Elements from "./elements";
import * as Collections from "./collections";
//import * as Views from "./views";
import * as Mixins from "./mixins";
import * as Modules from "./modules";
//import * as Customs from "./custom";
import * as Constants from "./constants";

export { Elements, Collections, Modules, Constants };
//export {Elements, Collections, Views, Mixins, Modules, Customs};

//TODO: make option manager in mixins and other stuff...instead of having options in components
//TODO: create a documentation page like SUIReact
export default {
  install(Vue, options) {
    const register = components => {
      Object.keys(components).forEach(key => {
        const component = components[key];
        Vue.component(component.name, component);
      });
    };
    
    register(Elements);
    register(Collections);
    //register(Views);
    register(Modules);
    //register(Customs);
  }
};
