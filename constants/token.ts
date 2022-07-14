import { configs } from "config";
import { createFernet, createSecret } from "fernet";

export const Client = createFernet(createSecret(32));

export const Application = createFernet(createSecret(32));

export const Bearer = createFernet(createSecret(32));
