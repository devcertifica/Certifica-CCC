// screens/HomePage.tsx
import FarmList from '@/components/home/FarmList';
import FarmSearchBar from '@/components/home/FarmSearchBar';
import { homeIndexStyles } from '@/components/home/styles';
import { API_BASE_URL } from '@/constants/api';
import { TFarm } from '@/constants/data';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import 'reflect-metadata';

import { database } from '@/database/database';
import Farm from '@/database/models/Farm';
import { farmService } from '@/database/services/FarmService';
import { Q } from '@nozbe/watermelondb';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterFarm, setFilterFarm] = useState<TFarm[]>([]);
  const [originFarm, setOriginFarm] = useState<TFarm[]>([]);
  const handleSearch = (query: string) => {
    setSearchValue(query);
    if (!query) {
      setFilterFarm(originFarm);
      return;
    }
    const results = originFarm.filter((farm) =>
      farm.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilterFarm(results);
  };

  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/consultant/1/farms`);
  //       setFilterFarm(response.data.farms);
  //       setOriginFarm(response.data.farms);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Add dummy farm data to the database
  const addToDatabase = async () => {
    const dummyFarm = {
      name: 'Dummy Farm',
      address: '123 Farm Lane',
    };

    try {
      const newFarm = await farmService.create(dummyFarm);
      console.log('Added to database:', newFarm);
    } catch (error) {
      console.error('Error adding to database:', error);
    }
  };

  // Fetch farms from the database
  const fetchFromDatabase = async () => {
    try {
      const farms = await farmService.fetchAll();
      console.log('Fetched from database:', farms);

      const mappedFarms: TFarm[] = farms.map((farm: any) => ({
        id: farm.id,
        name: farm.name,
        address: farm.address,
      }));

      // Update state with the mapped farms
      setFilterFarm(mappedFarms);
      setOriginFarm(mappedFarms);
    } catch (error) {
      console.error('Error fetching from database:', error);
    }
  };

  const resetDatabase = async () => {
    try {
      await database.write(async () => {
        await database.unsafeResetDatabase();
      });
      console.log('Database reset successfully');
    } catch (error) {
      console.error('Error resetting database:', error);
    }
  };

  useEffect(() => {
    resetDatabase();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: insets.bottom + 100,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Button title="Add to Database" onPress={addToDatabase} />
        <Button title="Show Database" onPress={fetchFromDatabase} />
      </View>
      {/* SearchBar Component */}
      <View style={homeIndexStyles.container}>
        <FarmSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
        />
      </View>
      {/* FarmList Component */}
      <FarmList farms={filterFarm} />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default HomePage;
