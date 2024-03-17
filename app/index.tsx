import {View, Text, ScrollView} from "react-native"
import React from "react"
import {useQuery} from "convex/react"
import {api} from "../convex/_generated/api"
export default function app(){
    const groups = useQuery(api.groups.data) ||[];
    console.log(api.groups.data)
    console.log(groups)
    return (
        <View style={{flex:1}} >

            <ScrollView>
                {groups.map((group)=>(
                    <View key={group.id}>
                        <Text>{group.name}</Text>
                    </View>


                ))



                }



            </ScrollView>

        </View>
    )
}