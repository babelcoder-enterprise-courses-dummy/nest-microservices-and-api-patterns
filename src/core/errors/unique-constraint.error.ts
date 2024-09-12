export class UniqueConstraintError extends Error {
  constructor(target: unknown) {
    const fields = Array.isArray(target) ? target.join(',') : target;

    super(`duplicate ${fields} field`);
    this.name = 'UniqueConstraintError';
  }
}
