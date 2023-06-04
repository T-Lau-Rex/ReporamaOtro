import Handlebars from "handlebars";
import handlebars from 'handlebars';

export const registerHelper = () => {
  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });
};