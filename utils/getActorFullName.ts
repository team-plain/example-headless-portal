export function getActorFullName(actor) {
	switch (actor.__typename) {
		case "CustomerActor": {
			return actor.customer.fullName;
		}
		case "UserActor": {
			return actor.user.fullName;
		}
		case "MachineUserActor": {
			return actor.user.fullName;
		}
	}
}
