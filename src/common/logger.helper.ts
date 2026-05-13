/**
 * Central logging helper (Express stack — no NestJS).
 *
 * @param options.level - Log level (e.g. info, warn, error)
 * @param options.method - Context or caller label
 * @param options.message - Log message
 * @param options.error - Optional error object
 * @param options.others - Optional additional information
 */
export const setLog = (options: {
  level: 'info' | 'warn' | 'error' | 'debug' | 'verbose';
  method: string;
  message: string;
  error?: Error;
  others?: string;
}) => {
  const method = options.method || 'DefaultContext';

  const sanitize = (str: string) =>
    str.replace(/[^a-zA-Z0-9\s\-_:]/g, '').trim();

  const level = sanitize(options.level.toLowerCase());
  const message = sanitize(options.message);
  const others = options.others ? sanitize(options.others) : null;

  let logOutput = `[${method}] ${message}`;
  if (others) {
    logOutput += ` | ${others}`;
  }

  const errLine = options.error
    ? options.error.stack || options.error.message
    : undefined;

  switch (level) {
    case 'info':
      console.log(logOutput);
      break;
    case 'warn':
      console.warn(logOutput);
      if (errLine) console.warn(errLine);
      break;
    case 'error':
      console.error(logOutput);
      if (errLine) console.error(errLine);
      break;
    case 'debug':
    case 'verbose':
      console.debug(logOutput);
      break;
    default:
      console.log(`Unknown Level: ${logOutput}`);
      break;
  }
};
