

export async function formToObject(body: FormData | false | null | undefined) {
  let object = {} as { [key: string]: any };

  if (!body) return object
  body.forEach(async (value, key) => {


    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }

    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  return object
}


const bundle = {
  formToObject,
}

export default bundle