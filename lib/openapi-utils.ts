export const extractRefFromType = (type: string) => {
  // If #/components/schemas/ is present, extract the name of the schema
  const match = type.match(/#\/components\/schemas\/(.*)/);
  if (match) {
    const ref = match[1];
    return ref;
  }
  return null;
};
