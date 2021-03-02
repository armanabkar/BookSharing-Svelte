<script>
	import meetups from './meetups-store.js';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '../UI/TextInput.svelte';
	import Button from '../UI/Button.svelte';
	import Modal from '../UI/Modal.svelte';
	import { isEmpty, isValidEmail } from '../helpers/validation.js';

	export let id = null;

	let title = '';
	let subtitle = '';
	let address = '';
	let email = '';
	let description = '';
	let imageUrl = '';
	let isFav;
	let formIsValid = false;

	if (id) {
		const selectedMeetup = $meetups.find(i => i.id === id);
		title = selectedMeetup.title;
		subtitle = selectedMeetup.subtitle;
		address = selectedMeetup.address;
		email = selectedMeetup.contactEmail;
		description = selectedMeetup.description;
		imageUrl = selectedMeetup.imageUrl;
	}

	const dispatch = createEventDispatcher();

	$: titleValid = !isEmpty(title);
	$: subTitleValid = !isEmpty(subtitle);
	$: addressValid = !isEmpty(address);
	$: descriptionValid = !isEmpty(description);
	$: imageURLValid = !isEmpty(imageUrl);
	$: emailValid = isValidEmail(email);
	$: formIsValid =
		titleValid &&
		subTitleValid &&
		addressValid &&
		descriptionValid &&
		imageURLValid &&
		emailValid;

	function submitForm() {
		const meetupData = {
			title: title,
			subtitle: subtitle,
			description: description,
			imageUrl: imageUrl,
			contactEmail: email,
			address: address,
		};

		if (id) {
			meetups.updateMeetup(id, meetupData);
		} else {
			meetups.addMeetup(meetupData);
		}
		dispatch('save-meetup');
	}

	function cancel() {
		dispatch('cancel');
	}

	function deleteMeetup() {
		console.log('deleting meetup: ', id);
		meetups.removeMeetup(id);
		dispatch('save-meetup');
	}
</script>

<style>
	form {
		width: 100%;
	}
</style>

<Modal title="Add New Meetup" on:cancel>
	<form on:submit|preventDefault={submitForm}>
		<TextInput
			id="title"
			label="Title"
			valid={titleValid}
			validityMessage="Title for your meetup, can't be blank!"
			value={title}
			on:input={event => (title = event.target.value)} />
		<TextInput
			id="subtitle"
			label="Subtitle"
			valid={subTitleValid}
			validityMessage="Maybe a little more deets of the meets?"
			value={subtitle}
			on:input={event => (subtitle = event.target.value)} />
		<TextInput
			id="address"
			label="Address"
			valid={addressValid}
			validityMessage="People neeed to know where to go!"
			value={address}
			on:input={event => (address = event.target.value)} />
		<TextInput
			id="imageUrl"
			label="ImageUrl"
			valid={imageURLValid}
			validityMessage="Images speak 1000 words."
			value={imageUrl}
			on:input={event => (imageUrl = event.target.value)} />
		<TextInput
			id="email"
			label="E-Mail"
			valid={emailValid}
			validityMessage="Who they gonna call?"
			value={email}
			type="email"
			on:input={event => (email = event.target.value)} />
		<TextInput
			id="description"
			label="Description"
			valid={descriptionValid}
			validityMessage="Why would anyone want to come?"
			value={description}
			controlType="textarea"
			on:input={event => (description = event.target.value)} />
	</form>
	<div slot="footer">
		<Button type="button" on:click={submitForm} disabled={!formIsValid}>
			Save
		</Button>
		{#if id}
			<Button type="button" on:click={deleteMeetup}>Delete</Button>
		{/if}
		<Button type="button" mode="outline" on:click={cancel}>Cancel</Button>

	</div>
</Modal>
