export default function is_color_dark(color) {
	color = color.slice(1);
	let color_len = color.length;
	if (color_len == 3) {
		color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
	}
	let color_sum = 0;
	for (let char of color) {
		color_sum += (char == "f") ? 15 : (char == "e") ? 14 : (char == "d") ? 13 : (char == "c") ? 12 : (char == "b") ? 11 : (char == "a") ? 10 : parseInt(char);
		if (color_sum > 8*6)
			return false;
	}
	return true;
}