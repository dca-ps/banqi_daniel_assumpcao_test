import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { useEffect, useState } from 'react';
import { set } from 'react-native-reanimated';


const XDate = require('xdate');

export default DateRangePicker = (props) => {

    LocaleConfig.locales['br'] = {
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        today: 'Hoje'
      };
    LocaleConfig.defaultLocale = 'br';


    const [isFromDatePicked, setIsFromDatePicked] = useState(false);
    const [isToDatePicked, setIsToDatePicked] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);


  useEffect(()=>{
    setupInitialRange()
  },[])

  onDayPress = (day) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupStartMarker(day)
    } else if (!isToDatePicked) {
      let localMarkedDates = {...markedDates}
      let [mMarkedDates, range] = setupMarkedDates(fromDate, day.dateString, localMarkedDates)
      if (range >= 0) {
        setIsFromDatePicked(true)
        setIsToDatePicked(true)
        setMarkedDates(mMarkedDates)
        setToDate(day.dateString)
      } else {
        setupStartMarker(day)
      }
    }
  }

  setupStartMarker = (day) => {
    let markedDates = {[day.dateString]: {startingDay: true, color: props.theme.markColor, textColor: props.theme.markTextColor}}

    setIsFromDatePicked(true)
    setIsToDatePicked(false)
    setMarkedDates(markedDates)
    setFromDate(day.dateString)
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {

    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    if (range >= 0) {
      if (range == 0) {
        markedDates = {[toDate]: {color: props.theme.markColor, textColor: props.theme.markTextColor}}
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {color: props.theme.markColor, textColor: props.theme.markTextColor}
          } else {
            markedDates[tempDate] = {endingDay: true, color: props.theme.markColor, textColor: props.theme.markTextColor}
          }
        }
      }
    }
    return [markedDates, range]
  }

  setupInitialRange = () => {
    if (!props.initialRange) return
    let [fromDate, toDate] = props.initialRange
    if(fromDate == null || toDate == null) return
    let markedDates = {[fromDate]: {startingDay: true, color: props.theme.markColor, textColor: props.theme.markTextColor}}
    let [mMarkedDates, range] = setupMarkedDates(fromDate, toDate, markedDates)
    setMarkedDates(mMarkedDates)
    setFromDate(fromDate)
  }

  const clear = () => {
    setMarkedDates({})
    setFromDate(null)
    setToDate(null)

  }

    return (
        <View>
            <Calendar {...props}
                markingType={'period'}
                current={fromDate}
                markedDates={markedDates}
                onDayPress={(day) => {onDayPress(day)}}/>

                <View style={{flexDirection: 'row', justifyContent:"space-around"}} >
                    <Button title="Ok" onPress={() => {props.onSuccess(fromDate, toDate)}}/>
                    <Button title="Limpar" onPress={() => {clear()}}/>
                </View>
        </View>
    )
}

DateRangePicker.defaultProps = {
  theme: { markColor: '#00adf5', markTextColor: '#ffffff' }
};