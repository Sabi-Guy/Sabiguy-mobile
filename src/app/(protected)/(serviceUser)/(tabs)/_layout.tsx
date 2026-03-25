import {Tabs} from 'expo-router'
export default function userTabsLayout(){
    return(
        <Tabs initialRouteName="(home)">
            <Tabs.Screen name='(home)'
            options={{
                title: "Home"
            }}/>
            <Tabs.Screen name='(hire)'
            options={{
                title: "Bookings"
            }}/>
            <Tabs.Screen name='(message)'
            options={{
                title: "Messages"
            }}/>
            <Tabs.Screen name='activity'
            options={{
                title: "Activity"
            }}/>
            <Tabs.Screen name='(profile)'
            options={{
                title: "Profile"
            }}/>
        </Tabs>
    )
}
