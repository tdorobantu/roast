import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

const SendCoupon = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data[0];
          setContacts((prev) =>
            data
              .filter((contact) => contact.phoneNumbers !== undefined)
              .map((contact) => {
                return {
                  key: contact.lookupKey,
                  name: contact.name,
                  phoneNumber: contact.phoneNumbers[0]?.number,
                };
              })
          );
          console.log(contacts);
        }
      }
    })();
  }, []);

  const test = [
    {
      key: "1703i7bcab3698b12c8dd.1703i2c443ead889cf9d9",
      name: "April LeBlanc",
      phoneNumber: "808-497-6774",
    },
    {
      key: "1703i38800cdb8e63c33b.1703i3e80ac850f1b4115",
      name: "Ardian Idrizi",
      phoneNumber: "646-644-3443",
    },
    {
      key: "1703i33842a2109edb449",
      name: "Arjun Aggarwal",
      phoneNumber: "+1-857-206-9170",
    },
    {
      key: "1703i45cdbbc80f81b583",
      name: "Arslan Awan",
      phoneNumber: "+1 347-593-2472",
    },
    {
      key: "1703i642cfa040cf4b74d",
      name: "Artem Bezrodny",
      phoneNumber: "+380 99 049 8247",
    },
  ];

  const renderContact = (contact) => {
    return (
      <View>
        <Text>{contact.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>heei</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  item: {
    backgroundColor: "yellow",
    width: "20",
    height: "20",
  },
});

export default SendCoupon;
