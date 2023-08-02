<script setup lang="ts">
import { TabItem, Tabs } from "./components/TabEnhanced";

defineProps<{
  msg: string;
}>();
</script>

<template>
  <!-- <Root>
    <CountComponent />
    <ButtonComponent />
  </Root> -->
  <div
    style="
      width: 500px;
      border: 1px solid;
      min-height: 500px;
      padding: 10px;
      margin: 0 auto;
    "
  >
    <Tabs>
      <TabItem label="Tab 1">
        <b>HELLO WORLD</b>
        <p>
          Officia ut enim voluptate magna ipsum adipisicing non proident id ut
          in. Irure laborum aute ut labore culpa sint nisi ut fugiat nisi. Aute
          anim aliquip culpa adipisicing. Lorem voluptate sint consectetur
          laboris. Velit aute pariatur ad consectetur aute consequat. Incididunt
          ex officia proident et do est nostrud. Velit Lorem proident dolore eu
          elit in esse. Magna anim minim in magna eu elit elit nostrud commodo.
          Veniam deserunt culpa qui eu proident sunt proident aliqua eu est esse
          occaecat. Fugiat nulla consectetur commodo labore. Nostrud nostrud qui
          et reprehenderit aliqua ullamco commodo in nostrud veniam ad eu fugiat
          amet. Dolore aute minim aute ex voluptate magna. Dolore sint Lorem
          cupidatat ex. Aute aliqua eiusmod esse voluptate cupidatat elit fugiat
          duis ut ea ut sit quis proident. Aliquip amet ipsum dolore proident do
          non consequat Lorem nulla enim nisi anim laborum. Cillum pariatur
          cupidatat minim ad culpa exercitation aliquip adipisicing exercitation
          deserunt ad veniam. Amet amet nulla elit in aute est minim non velit
          ipsum ut ullamco sint. Excepteur mollit amet irure duis id mollit
          proident. Ipsum cupidatat Lorem aliquip cillum excepteur enim dolor
          Lorem commodo ipsum ullamco ad exercitation. Excepteur consequat quis
          irure duis ipsum nostrud tempor sint enim. Est fugiat excepteur
          occaecat culpa velit do consequat veniam non est velit ullamco
          consectetur aliquip. Amet magna incididunt ipsum non velit nulla Lorem
          ullamco enim ex nisi dolore. Mollit ex ut occaecat dolor nostrud.
        </p>
        Content 1
      </TabItem>
      <TabItem label="Tab 2" active> Content 2 </TabItem>
      <TabItem label="Tab 3"> Content 3 </TabItem>
      <TabItem label="Tab 4"> Content 4 </TabItem>
    </Tabs>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
