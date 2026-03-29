import {Tabs} from 'expo-router'
export default function userTabsLayout(){
    return(
        <Tabs initialRouteName="(home)">
            <Tabs.Screen name='(home)'
            options={{
                title: "Home",
                headerShown: false
            }}/>
            <Tabs.Screen name='(hire)'
            options={{
                title: "Bookings",
                headerShown: false
            }}/>
            <Tabs.Screen name='(message)'
            options={{
                title: "Messages",
                headerShown: false
            }}/>
            <Tabs.Screen name='activity'
            options={{
                title: "Activity",
                headerShown: false
            }}/>
            <Tabs.Screen name='(profile)'
            options={{
                title: "Profile",
                headerShown: false
            }}/>
        </Tabs>
    )
}
