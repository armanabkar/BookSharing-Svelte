<script>
	import { createEventDispatcher } from 'svelte';
	import MeetupItem from './MeetupItem.svelte';
	import MeetupFilter from './MeetupFilter.svelte';
	import Button from '../UI/Button.svelte';

	const dispatch = createEventDispatcher();

	export let meetups;

	let favsOnly = false;

	$: filterMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

	function setFilter(event) {
		favsOnly = event.detail === 1;
	}
</script>

<style>
	#meetup-controls {
		margin: 1rem 1rem 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
	}

	#meetups {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		#meetups {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>

<section id="meetup-controls">
	<MeetupFilter on:select={setFilter} />
	<Button
		on:click={() => {
			dispatch('add');
		}}>
		New Meetup
	</Button>
</section>

<section id="meetups">

	{#each filterMeetups as meetup, i}
		<MeetupItem
			id={meetup.id}
			isFav={meetup.isFavorite}
			title={meetup.title}
			subtitle={meetup.subtitle}
			description={meetup.description}
			imageUrl={meetup.imageUrl}
			address={meetup.address}
			contact={meetup.contactEmail}
			on:show-details
			on:edit />
	{/each}
</section>
