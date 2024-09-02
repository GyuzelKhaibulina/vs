module.exports = {

    "rules": {
        "react/jsx-no-duplicate-props": [1, { "ignoreCase": false }]
      },
    'no-async-when-use-client': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow async keyword for default exported components that use "use client"',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
        schema: [],
      },
  
      create(context) {
        return {
          ExportDefaultDeclaration(node) {
            const sourceCode = context.getSourceCode();
            const componentNode = node.declaration;
  
            if (
              componentNode.type === 'FunctionDeclaration' ||
              (componentNode.type === 'FunctionExpression' && componentNode.id)
            ) {
              const functionName = componentNode.id ? componentNode.id.name : '<anonymous>';
  
              const componentLines = sourceCode.getLines(componentNode.loc.start.line, componentNode.loc.end.line);
              const usesUseClient = hasUseClient(componentLines);
              const isAsync = componentNode.async;
  
              if (usesUseClient && isAsync) {
                context.report({
                  node: componentNode,
                  message: `Default exported component '${functionName}' should not be declared as async when component is declared 'use client'`,
                });
              }
            }
          },
        };
      }
    }
  };
  
  function hasUseClient(lines) {
    for (const line of lines) {
      const trimmedLine = line.trim();
  
      if (trimmedLine.includes('use client')) return true;
    }
  
    return false; 
  }