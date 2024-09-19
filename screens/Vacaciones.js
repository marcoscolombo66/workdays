import * as React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { supabase } from '../supabase';
import Animated from 'react-native-reanimated';

export default function Vacaciones({ id_usuario, route, navigation }) {
  const [selectedDates, setSelectedDates] = React.useState({});
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const bottomSheetRef = React.useRef(null);

  const onDayPress = (day) => {
    if (!startDate) {
      setSelectedDates({ [day.dateString]: { selected: true, marked: true } });
      setStartDate(day.dateString);
      return;
    }

    const newSelectedDates = { ...selectedDates };
    if (day.dateString === startDate) {
      setSelectedDates({});
      setStartDate(null);
      setEndDate(null);
      return;
    }

    if (day.dateString < startDate) {
      setEndDate(startDate);
      setStartDate(day.dateString);
    } else {
      setEndDate(day.dateString);
    }

    for (const date in selectedDates) {
      newSelectedDates[date] = { selected: false, marked: false };
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let date = new Date(start.getTime()); date <= end; date.setDate(date.getDate() + 1)) {
      newSelectedDates[date.toISOString().slice(0, 10)] = { selected: true, marked: true };
    }

    setSelectedDates(newSelectedDates);
  };

  const saveDatesToSupabase = async () => {
    if (startDate) {
      const dataToInsert = { fecha_inicio: startDate, fecha_fin: endDate, id_usuario: id_usuario };

      const { data, error } = await supabase.from('vacaciones').insert({ ...dataToInsert });

      if (error) {
        console.error(error);
      } else {
        console.log('Dates saved:', data);
        setSelectedDates({});
        setStartDate(null);
        setEndDate(null);
        setBottomSheetVisible(false);
        bottomSheetRef.current?.close();
      }
    } else {
      console.warn('Please select both a start and end date.');
    }
  };

  const renderSelectedDatesText = () => {
    if (!startDate) {
      return 'Seleccione una fecha';
    } else if (!endDate) {
      return `Fecha inicio: ${startDate}`;
    } else {
      return `Del ${startDate} al ${endDate}`;
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'multi-dot'}
      />
      <TouchableOpacity style={styles.modalButton} onPress={() => setBottomSheetVisible(true)}>
        
      </TouchableOpacity>
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: 'grey', width: 40, height: 6, borderRadius: 2 }}
        ref={bottomSheetRef}
        snapPoints={['50%']}
        index={isBottomSheetVisible ? 0 : -1}
        enablePanDownToClose={true}
        onClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.sheetTitle}>Guardar Fechas</Text>
          <Text style={styles.sheetText}>{renderSelectedDatesText()}</Text>
          <View style={styles.buttonRow}>
            <Button title="Guardar" onPress={saveDatesToSupabase} />
            <Button title="Cancelar" onPress={() => {
              setBottomSheetVisible(false);
              bottomSheetRef.current?.close();
            }} />
          </View>
        </View>
         
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  modalButton:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sheetText: {
    fontSize: 18,
    marginVertical: 16,
  },
  closeButton: {
    marginTop: 16,
    color: 'blue',
    fontSize: 18,
  },
  icon: {
    width: 35,
    height: 35,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 150
  },
});
