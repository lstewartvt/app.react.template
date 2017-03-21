let context = require.context('./src/components', true, /\.test\.jsx?$/);
context.keys().forEach(context);