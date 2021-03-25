// eslint-disable-next-line import/export
export enum Severity {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
}

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace Severity {
  /**
   * Converts a string-based level into a {@link Severity}.
   *
   * @param level string representation of Severity
   * @returns Severity
   */
  export function fromString(level: string): Severity {
    switch (level) {
      case 'fatal':
        return Severity.Fatal;
      case 'warn':
      case 'warning':
        return Severity.Warning;
      case 'log':
      case 'info':
        return Severity.Info;
      case 'debug':
        return Severity.Debug;
      default:
        return Severity.Error;
    }
  }
}
