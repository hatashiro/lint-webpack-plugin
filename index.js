const cp = require('child_process');

const exec = (cmd) => {
  const opts = {
    env: Object.assign({}, process.env)
  };

  opts.env.PATH += `:${process.cwd()}/node_modules/.bin`;

  return new Promise((resolve, reject) =>
    cp.exec(cmd, opts, (err, stdout, stderr) => {
      stdout = stdout ? stdout.trim() : '';
      stderr = stderr ? stderr.trim() : '';

      const prefix = `[\x1b[1m${err ? '\x1b[31m' : '\x1b[32m'}${cmd}\x1b[0m] `;

      if (stdout) {
        stdout.split('\n').forEach(line => console.log(prefix + line));
      }
      if (stderr) {
        stderr.split('\n').forEach(line => console.log(prefix + line));
      }

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  );
};

class LintPlugin {
  constructor(commands) {
    this.name = 'LintPlugin';
    this.run = () => Promise.all(commands.map(exec));
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tapPromise(this.name, this.run);
    compiler.hooks.watchRun.tapPromise(
      this.name,
      () => this.run().catch(() => {}) // ignore error
    );
  }
}

module.exports = LintPlugin;
