
const _ = require('lodash');

module.exports = (appName, overridenPages) => {
  const possibleSteps = require('./are_form/steps');

  return (stepOrData, data) => {
    const props = {};
    if (typeof stepOrData === 'string') {
      props.steps = _.dropRightWhile(possibleSteps, val => val !== stepOrData);
      props.steps.pop();
    } else {
      props.steps = possibleSteps;
    }
    props.steps.forEach(prop => {
      if (prop !== '/') {
        try {
          /* eslint-disable no-nested-ternary */
          if (overridenPages && require(`./${appName}/${overridenPages}${prop}`)) {
            Object.assign(props, require(`./${appName}/${overridenPages}${prop}`),
              data ? data : typeof stepOrData === 'object' ? stepOrData : {});
          } else {
            Object.assign(props, require(`./${appName}/pages${prop}`),
              data ? data : typeof stepOrData === 'object' ? stepOrData : {});
          }

          /* eslint-disable no-empty */
        } catch (e) {}
        /* eslint-enable no-empty */
        /* eslint-enable no-nested-ternary */
      }
    });
    return props;
  };
};
