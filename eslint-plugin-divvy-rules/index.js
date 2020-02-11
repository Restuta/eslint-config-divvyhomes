const useCoreError = {
  create: context => ({
    Identifier: node => {
      if (node.name === 'Error') {
        context.report({ node, message: 'Use CoreError from @app/errors' });
      }
    },
  }),
};

const useUserFacingError = {
  create: context => ({
    Identifier: node => {
      if (node.name === 'UserError') {
        context.report({ node, message: 'Use UserFacingError from @app/errors' });
      }
    },
  }),
};

const useNewWithError = {
  create: context => ({
    CallExpression: node => {
      const { name } = node.callee;
      if (name === 'Error' || name === 'CoreError') {
        context.report({ node, message: `Use \`new ${name}()\`` });
      }
    },
  }),
};

module.exports = {
  rules: {
    'use-core-error': useCoreError,
    'use-user-facing-error': useUserFacingError,
    'use-new-with-error': useNewWithError,
  },
};
