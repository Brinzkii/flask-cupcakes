let list = $('ul');

$(function () {
	updateHome();
});

async function updateHome() {
	let response = await axios.get('/api/cupcakes');
	let cupcakes = response.data.cupcakes;

	for (c of cupcakes) {
		let li = $('<li>');
		li.text(c.flavor);
		list.append(li);
	}
}

$('button.add').on('click', addCupcake);

async function addCupcake() {
	let url = 'https://tinyurl.com/demo-cupcake';

	if ($('#image').val() !== '') {
		url = $('#image').val();
	}

	cupcake = {
		flavor: $('#flavor').val(),
		size: $('#size').val(),
		rating: $('#rating').val(),
		image: url,
	};

	let response = await axios.post('/api/cupcakes', cupcake);

	let li = $('<li>');
	li.text(cupcake.flavor);
	list.append(li);
	$('form')[0].reset();

	return response.data.cupcake;
}
