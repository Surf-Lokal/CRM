import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getContacts } from "../../modules/getContacts";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";

const Contact = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = () => {
    dispatch(getContacts()).then((response) => {
      const contactsData = response.payload.data;
      setData(Object.values(contactsData));
      setLoading(false);
    });
  };

  const handleRefresh = () => {
    if (!loading) {
      setLoading(true);
      getAllContacts();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View
          style={{
            height: 40,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.PrimaryColor,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              source={require("../../../assets/back.png")}
            ></Image>
            <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: Colors.white }}>Contacts</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddContacts")}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              source={require("../../../assets/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 80,
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: Colors.PrimaryColor,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              width: "92%",
              height: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/search.png")}
              style={{
                height: 20,
                width: 20,
                marginLeft: 10,
                tintColor: Colors.white,
              }}
            ></Image>
            <TextInput
              allowFontScaling={false}
              placeholder="Search"
              placeholderTextColor={Colors.white}
              onChangeText={(email) => setEmail(email)}
              style={{
                color: Colors.white,
                fontSize: 18,
                marginLeft: 10,
                fontWeight: "bold",
              }}
            ></TextInput>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}></View>
        <View style={{ flex: 1 }}>
          {loading ? (
            <Activity />
          ) : (
            <FlatList
              data={data}
              ListFooterComponent={<View style={{ height: 50 }}></View>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ContactsDetails", { item: item })
                  }
                  style={{
                    height: 80,
                    width: "96%",
                    alignSelf: "flex-end",
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.gray,
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "20%" }}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: Colors.gray,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.PrimaryColor,
                          fontSize: 12,
                        }}
                      >
                        {item.contact_full_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "75%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {item.contact_name}
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 12,
                        }}
                      >
                        {item.post_title}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../../../assets/leftArrow.png")}
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: "contain",
                        }}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              onRefresh={handleRefresh}
              refreshing={loading}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contact;
