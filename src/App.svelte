<script>
	import meetups from './Meetups/meetups-store.js';
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import TextInput from './UI/TextInput.svelte';
	import Button from './UI/Button.svelte';
	import EditMeetup from './Meetups/EditMeetup.svelte';
	import MeetupDetail from './Meetups/MeetupDetail.svelte';

	let editMode = null;
	let editedId;
	let page = 'overview';
	let pageData = {};

	function cancelEdit() {
		editMode = null;
		editedId = null;
	}

	function savedMeetup() {
		editMode = null;
		editedId = null;
	}

	function showDetails(event) {
		page = 'details';
		pageData.id = event.detail;
		console.log(pageData);
	}

	function closeDetails() {
		page = 'overview';
		pageData = {};
	}

	function startEdit(event) {
		editMode = 'edit';
		editedId = event.detail;
	}
</script>

<style>
	main {
		margin-top: 5rem;
	}
</style>

<Header />

{#if page === 'overview'}
	<main>
		{#if editMode === 'edit'}
			<EditMeetup
				id={editedId}
				on:save-meetup={savedMeetup}
				on:cancel={cancelEdit} />
		{/if}
		<MeetupGrid
			meetups={$meetups}
			on:show-details={showDetails}
			on:edit={startEdit}
			on:add={() => (editMode = 'edit')} />
	</main>
{:else}
	<MeetupDetail id={pageData.id} on:close={closeDetails} />
{/if}
