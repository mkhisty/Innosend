import { Stack } from 'expo-router';
import {ConvexProvider,ConvexReactClient} from "convex/react"

const convex = new ConvexReactClient("https://focused-corgi-601.convex.cloud"
,{
  unsavedChangesWarning:false,

})


export default function RootLayoutNav() {

  return (
    <ConvexProvider client={convex}>

<Stack></Stack>


    </ConvexProvider>
  );
}
//hidknd