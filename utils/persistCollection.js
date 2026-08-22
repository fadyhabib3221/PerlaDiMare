export async function persistCollection({
  storageKey,
  next,
  guardedSave,
  setData,
  setError,
  conflictMessage,
  fallbackMessage = "Could not save data, please try again",
}) {
  try {
    await guardedSave(storageKey, next);
    setData(next);
  } catch (error) {
    setError(error && error.isConflict ? conflictMessage : fallbackMessage);
  }
}
