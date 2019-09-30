const templateType = require("./templateType");
const wizardType = require("./wizardType");
const path = require("path");
const fs = require("fs");
const toSpaceCase = require("to-space-case");

exports.getGeneratorQuestions = function(type, settings, name) {
  let questions;

  switch (type) {
    case wizardType.WIZARD: {
      questions = [
        askType(),
        askName(name),
        askDestination(
          templateType.FUNCTIONALCOMPONENT,
          settings.componentDestination,
          true
        ),
        askDestination(
          templateType.COMPONENT,
          settings.componentDestination,
          true
        ),
        askDestination(
          templateType.STYLEDCOMPONENT,
          settings.componentDestination,
          true
        ),
        askDestination(
          templateType.TSCOMPONENT,
          settings.tscomponentDestination,
          true
        ),
        askDestination(templateType.PAGE, settings.pageDestination, true),
        askDestination(templateType.TSPAGE, settings.tspageDestination, true),
        askDestination(templateType.VIEW, settings.viewDestination, true),
        askDestination(templateType.SETUP, settings.setupDestination, true),
        askDestination(templateType.STORE, settings.storeDestination, true),
        askDestination(templateType.REDUX, settings.reduxDestination, true),
        askDestination(
          templateType.REDUXMODULE,
          settings.reduxModuleDestination,
          true
        ),
        askDestination(
          templateType.SERVICES,
          settings.servicesDestination,
          true
        ),
        askDestination(templateType.CONFIG, settings.configDestination, true),
        askDestination(
          templateType.SERVICEMODULE,
          settings.serviceModuleDestination,
          true
        ),
        askDestination(templateType.REQUEST, settings.requestDestination, true),
        askDestination(templateType.STORAGE, settings.storageDestination, true),
        askDestination(templateType.ROUTE, settings.routeDestination, true),
      ];
      break;
    }
    case wizardType.STORE: {
      questions = [
        askName(name),
        askDestination(templateType.STORE, settings.storeDestination)
      ];
      break;
    }
    case wizardType.REDUX: {
      questions = [
        askName(name),
        askDestination(templateType.REDUX, settings.reduxDestination)
      ];
      break;
    }
    case wizardType.REDUXMODULE: {
      questions = [
        askName(name),
        askDestination(
          templateType.REDUXMODULE,
          settings.reduxModuleDestination
        )
      ];
      break;
    }
    case wizardType.SERVICES: {
      questions = [
        askName(name),
        askDestination(templateType.SERVICES, settings.servicesDestination)
      ];
      break;
    }
    case wizardType.SERVICEMODULE: {
      questions = [
        askName(name),
        askDestination(
          templateType.SERVICEMODULE,
          settings.serviceModuleDestination
        )
      ];
      break;
    }
    case wizardType.REQUEST: {
      questions = [
        askName(name),
        askDestination(templateType.REQUEST, settings.requestDestination)
      ];
      break;
    }
    case wizardType.STORAGE: {
      questions = [
        askName(name),
        askDestination(templateType.STORAGE, settings.storageDestination)
      ];
      break;
    }
    case wizardType.CONFIG: {
      questions = [
        askName(name),
        askDestination(templateType.CONFIG, settings.configDestination)
      ];
      break;
    }
    case wizardType.SETUP: {
      questions = [
        askName(name),
        askDestination(templateType.SETUP, settings.setupDestination)
      ];
      break;
    }
    case wizardType.FUNCTIONALCOMPONENT: {
      questions = [
        askName(name),
        askDestination(templateType.FUNCTIONALCOMPONENT, settings.componentDestination)
      ];
      break;
    }
    case wizardType.COMPONENT: {
      questions = [
        askName(name),
        askDestination(templateType.COMPONENT, settings.componentDestination)
      ];
      break;
    }
    case wizardType.STYLEDCOMPONENT: {
      questions = [
        askName(name),
        askDestination(
          templateType.STYLEDCOMPONENT,
          settings.componentDestination
        )
      ];
      break;
    }
    case wizardType.VIEW: {
      questions = [
        askName(name),
        askDestination(templateType.VIEW, settings.viewDestination)
      ];
      break;
    }
    case wizardType.TSCOMPONENT: {
      questions = [
        askName(name),
        askDestination(
          templateType.TSCOMPONENT,
          settings.tscomponentDestination
        )
      ];
      break;
    }
    case wizardType.PAGE: {
      questions = [
        askName(name),
        askDestination(templateType.PAGE, settings.pageDestination)
      ];
      break;
    }
    case wizardType.TSPAGE: {
      questions = [
        askName(name),
        askDestination(templateType.TSPAGE, settings.tspageDestination)
      ];
      break;
    }
    case wizardType.ROUTE: {
      questions = [
        askName(name),
        askDestination(templateType.ROUTE, settings.routeDestination)
      ];
      break;
    }
  }

  return questions;
};

exports.getSettingQuestions = function(settings) {
  return Object.keys(settings).map(key => askSetting(key, settings[key]));
};

exports.getCopyQuestions = function(destination) {
  return [askCopyDestination(destination)];
};

function askSetting(key, defaultValue) {
  return {
    type: "input",
    name: key,
    message: toSpaceCase(key),
    default: defaultValue || ""
  };
}

function askType() {
  return {
    type: "list",
    name: "type",
    message: "What do you want to generate ?",
    choices: Object.keys(templateType).map(key => templateType[key])
  };
}

function askName(defaultName) {
  return {
    type: "input",
    name: "name",
    message: "What name do you want to use?",
    default: defaultName || "",
    filter(value) {
      return value.trim();
    },
    validate(value) {
      return value.trim().length == 0 ? "No name given" : true;
    }
  };
}

function askCopyDestination(defaultDestination) {
  return {
    type: "input",
    name: "destination",
    message: "destination",
    default: defaultDestination || "."
  };
}

function askDestination(name, defaultDestination, optional = false) {
  return {
    type: "input",
    name: "destination",
    message: "Where do you want to create the " + name + "?",
    default: defaultDestination || "",
    when(answers) {
      return !optional || (optional && answers.type == name);
    },
    validate(input) {
      const destination = path.resolve(input);

      if (!fs.existsSync(destination)) {
        return `path: ${destination} doesn't exist`;
      }
      return true;
    }
  };
}
