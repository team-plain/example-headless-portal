export function getPriority(priority: number) {
	switch (priority) {
		case 0: {
			return "Urgent";
		}
		case 1: {
			return "High";
		}
		case 2: {
			return "Normal";
		}
		case 3: {
			return "Low";
		}
		default: {
			return "Normal";
		}
	}
}
