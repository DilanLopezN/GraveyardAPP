import { Tabs } from 'expo-router'
import React from 'react'
import { TbGrave } from 'react-icons/tb'
import { Colors } from '@/src/constants/Colors'
import { useColorScheme } from '@/src/hooks/useColorScheme'
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon'
import SvgGrave from '../../assets/images/grave.svg'
export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <SvgGrave width={32} height={32} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
