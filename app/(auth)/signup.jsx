import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    full_names: '',
    phone_number: '',
    email: '',
    password: ''
  });

  const handleChangeData = (name, value) => {
    setData({
      ...data,
      [name]: value
    });
  };

  const [error, setError] = useState('');
  
  const signUp = async () => {
    try {
      const response = await fetch("http://10.5.222.49:3200/users/signup", {
        method: "POST",
        body: JSON.stringify({
          full_names: data.full_names,
          phone_number: data.phone_number,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("User created successfully");
      } else {
        setError("Could not create user");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-24">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full bg-white w-full rounded-t-[25px] flex items-center px-5 py-6">
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <Text className="text-4xl font-bold">
              Supa
              <Text className="text-primary">Menu</Text>
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col items-center gap-2 py-5">
            <Text className="font-bold text-secondary text-lg">
              Welcome ...
            </Text>
            <Text className="text-third">Please fill in the information.</Text>
          </View>
          <View className="flex flex-col w-full">
            <View className="flex flex-row items-center justify-between border w-full h-[50px] rounded-md border-third overflow-hidden py-4 pl-4">
              <FontAwesome name="user-o" size={24} color="#b1b6c8" />
              <TextInput
                placeholder="Full Name"
                className="flex-1 px-3 items-center h-[50px]"
                value={data.full_names}
                onChangeText={(value) => handleChangeData('full_names', value)}
              />
            </View>
            <View className="flex flex-row items-center mt-2 justify-between border w-full h-[50px] rounded-md border-third p-4">
              <FontAwesome5 name="phone-alt" size={15} color="#b1b6c8" />
              <TextInput
                placeholder="Phone Number"
                keyboardType="numeric"
                className="flex-1 px-3 items-center h-[50px]"
                value={data.phone_number}
                onChangeText={(value) => handleChangeData('phone_number', value)}
              />
            </View>
            <View className="flex flex-row items-center mt-2 justify-between border w-full h-[50px] rounded-md border-third p-4">
              <MaterialCommunityIcons
                name="email-outline"
                size={18}
                color="#b1b6c8"
              />
              <TextInput
                placeholder="Your Email"
                keyboardType="email-address"
                className="flex-1 px-3 items-center h-[50px]"
                value={data.email}
                onChangeText={(value) => handleChangeData('email', value)}
              />
            </View>
            <View className="flex flex-row items-center mt-2 justify-between border w-full h-[50px] rounded-md border-third overflow-hidden py-4 pl-4">
              <MaterialIcons name="lock-outline" size={17} color="#b1b6c8" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="flex-1 px-3 items-center h-[50px]"
                value={data.password}
                onChangeText={(value) => handleChangeData('password', value)}
              />
            </View>
          </View>
          <View className="flex w-full items-center py-4">
            <CustomButton
              handlePress={signUp}
              content="Proceed"
            />
          </View>
          {error ? <Text className="text-red-500">{error}</Text> : null}
          <Text className="text-third font-bold mt-4">OR</Text>
          <Text className="text-third py-1 font-bold">
            Already have an account?
          </Text>
          <View className="flex w-full items-center py-4">
            <CustomButton
              handlePress={() => router.push("/login")}
              content="Sign In"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
