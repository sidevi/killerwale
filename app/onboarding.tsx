import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ListRenderItemInfo,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

type SlideType = {
  id: number;
  title: string;
  image?: any;
  last?: boolean;
  subtitle?: string;
  logo?: any;
};

const slides: SlideType[] = [
  {
    id: 1,
    title: "Consult only with a doctor you trust",
    image: require("../assets/images/image1.png"),
  },
  {
    id: 2,
    title: "Find a lot of specialist doctors in one place",
    image: require("../assets/images/Image2.png"),
  },
  {
    id: 3,
    title: "Get connected to our Online Consultation",
    image: require("../assets/images/image3.png"),
  },
  {
    id: 4,
    last: true,
    title: "Let’s get started!",
    subtitle: "Login to enjoy the features we’ve provided, and stay healthy!",
    logo: require("../assets/images/Logo.png"),
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const flatRef = useRef<FlatList<SlideType>>(null);
  const router = useRouter();

  // Auto scroll every 3 seconds
  useEffect(() => {  
if (index >= slides.length - 1) return;

  const timer = setTimeout(() => {
    flatRef.current?.scrollToOffset({
      offset: (index + 1) * width,
      animated: true,
    });
    setIndex((prev) => prev + 1);
  }, 3000);

  return () => clearTimeout(timer);
}, [index]);







    

 
 
 
 
  const gonext = () => {
    if (index < slides.length - 1) {
      flatRef.current?.scrollToOffset({
        offset: (index + 1) * width,
        animated: true,
      });

      setIndex(index + 1);
    } else {
      router.replace("/auth");
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<SlideType>) => {
    if (item.last) {
      return (
        <View style={[styles.lastSlide, { width }]}>
          <Image source={item.logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.lastTitle}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.replace("/auth")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => router.replace("/auth")}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[styles.slide, { width }]}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>

        <TouchableOpacity style={styles.nextButton} onPress={gonext}>
          <Text style={styles.nextText}>→</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.replace("/auth")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onMomentumScrollEnd={(ev) =>
          setIndex(Math.round(ev.nativeEvent.contentOffset.x / width))
        }
        {...(Platform.OS === "web" ? { id: "flatlist-container" } : {})} // Web container ID
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  skipButton: { position: "absolute", top: 50, right: 20, zIndex: 10 },
  skipText: { color: "#888", fontSize: 16, fontWeight: "600" },

  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    height,
  },
  image: { width: 300, height: 430, marginBottom: 30 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 25,
  },
  nextButton: {
    backgroundColor: "#14b8a6",
    padding: 15,
    borderRadius: 40,
    width: 80,
    alignItems: "center",
  },
  nextText: { color: "#fff", fontSize: 20 },

  dotsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  dot: { height: 8, borderRadius: 5, marginHorizontal: 6 },
  activeDot: { width: 24, backgroundColor: "#14b8a6" },
  inactiveDot: { width: 8, backgroundColor: "#ccc" },

  lastSlide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    height,
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  lastTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14b8a6",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    width: "80%",
    marginBottom: 45,
  },
  loginBtn: {
    backgroundColor: "#14b8a6",
    padding: 15,
    borderRadius: 30,
    width: "75%",
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  signupBtn: {
    borderWidth: 1,
    borderColor: "#14b8a6",
    padding: 15,
    borderRadius: 30,
    width: "75%",
    alignItems: "center",
  },
  signupText: { color: "#14b8a6", fontSize: 16, fontWeight: "bold" },
});
