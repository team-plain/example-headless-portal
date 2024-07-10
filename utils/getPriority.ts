export function getPriority(priority: 0 | 1 | 2 | 3) {
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
	}
}
