type Constructor<T extends object = object> = new (...args: any[]) => T;
type Prototype<T extends object = object> = { prototype: T };
type ClassDef<T extends object = object> = Constructor<T> & Prototype<T>;
export default ClassDef;
