import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppUpdateContext } from "../AppContext";
import * as Contacts from "expo-contacts";
import { SearchBar } from "@rneui/base";

const ContactSearch = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const updateContext = useAppUpdateContext();


  const updateSearch = (search) => {
    console.log(search);
    setSearch(search);
  };

  const filterContact = (contact, filterValue) => {
    return {
      key: contact.key,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      display: filterValue,
    };
  };

  useEffect(() => {
    if (search !== "") {
      setContacts((prev) =>
        prev.map((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
            ? filterContact(contact, true)
            : filterContact(contact, false)
        )
      );
    } else {
      setContacts((prev) =>
        prev.map((contact) => filterContact(contact, true))
      );
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts((prev) =>
            data
              .filter((contact) => contact.phoneNumbers !== undefined)
              .map((contact) => {
                return {
                  key: contact.lookupKey,
                  name: contact.name,
                  phoneNumber: contact.phoneNumbers[0]?.number,
                  display: true,
                };
              })
          );
        }
      }
    })();
  }, []);

  const handlePress = (contact) => {
    updateContext({
      key: contact.key,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
    });
    navigation.navigate('SendGift')
  };

  const renderContact = (contact) => {
    return (
      <TouchableOpacity onPress={() => handlePress(contact)}>
        <View style={styles.item}>
          <Text style={styles.text}>{contact.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <SearchBar
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.search}
          placeholder="Search Contacts"
          onChangeText={updateSearch}
          value={search}
          onClear={() => setSearch((prev) => "")}
        />
      </View>
      <FlatList
        data={contacts.filter((contact) => contact.display)}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => renderContact(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  item: {
    padding: 20,
    fontSize: 20,
    marginTop: 2.5,
    borderBottomColor: "whitesmoke",
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: "800",
    color: "black",
  },
  searchView: {
    marginBottom: 30,
  },
  search: {
    backgroundColor: "whitesmoke",
    width: 250,
    height: 40,
    color: "black",
    borderRadius: 5,
  },
  searchContainer: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderTopColor: "white",
  },
});

export default ContactSearch;
