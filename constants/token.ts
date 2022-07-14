import { configs } from "config";
import { createFernet, createSecret } from "fernet";

export const Client = createFernet("7I5rwYZbBSevxuzZhtfjKcSJq8aMGVS3o_4tzgQswR4=");

export const Application = createFernet(createSecret(32));

export const Bearer = createFernet(createSecret(32));

export const Refresh = createFernet("7I5rwYZbBSevxuzZhtfjKcSJq8aMGVS3o_4tzgQswR4=");
