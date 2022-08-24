<script>
	import { 
		HeroSection, 
		CreateCollectionSection, 
		LearnSection, 
		InvitationSection,
		FeaturedCollections
	} from "$lib/components/sections/home/index";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<HeroSection/>
<CreateCollectionSection/>
<FeaturedCollections/>
<LearnSection/>
<InvitationSection/>