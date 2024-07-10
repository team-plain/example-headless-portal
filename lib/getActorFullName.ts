import type { Actor } from "./types";

export function getActorFullName(actor: Actor) {
	switch (actor.__typename) {
		case "CustomerActor": {
			return actor.customer.fullName;
		}
		case "UserActor": {
			return actor.user.fullName;
		}
		case "MachineUserActor": {
			return actor.machineUser.fullName;
		}
	}
}
