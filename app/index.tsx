import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import CustomBlurView from "@/components/CustomBlurView";
import { GROUP, SubGroupRenderTypes } from "@/types";
import { DATA } from "@/mock/groupData";
import { Ionicons } from "@expo/vector-icons";

const ITEM_HEIGHT = 80;
const GAP = 8;

const SubGroupRender = ({ val, i, isSubGroups }: SubGroupRenderTypes) => {
  const theme = useTheme();

  const animatedSubGroupStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: !isSubGroups ? withTiming(1 - 0.05 * (i + 1)) : withTiming(1),
        },
      ],
    };
  });

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        styles.groupListItem,
        animatedSubGroupStyle,
        {
          marginTop: !isSubGroups ? (-ITEM_HEIGHT / 2.4) * (i + 1) : GAP,
          //   opacity: !isSubGroups ? 1 - 0.3 * i : 1,
          zIndex: -(i + 1),
        },
      ]}
    >
      <CustomBlurView />
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {val.name}
      </Text>
      <Text style={[styles.desc, { color: theme.colors.text }]}>
        {val.description}
      </Text>
    </Animated.View>
  );
};

const RenderItem = ({ item }: { item: GROUP }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [isSubGroups, setSubGroups] = useState(false);

  const animatedChevronIcon = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: isSubGroups ? withSpring("180deg") : withSpring("0deg") },
      ],
    };
  });

  return (
    <Animated.View layout={LinearTransition}>
      <Pressable
        onPress={() => setSubGroups((prev) => !prev)}
        style={[
          styles.groupListItem,
          {
            zIndex: 10,
            backgroundColor:
              colorScheme === "light"
                ? "rgba(255,255,255,0.5)"
                : "rgba(0,0,0,0.5)",
          },
        ]}
      >
        <CustomBlurView />
        {item.subGroups?.length > 0 && (
          <Animated.View style={[styles.chevronIcon, animatedChevronIcon]}>
            <Ionicons name="chevron-down" size={20} color={theme.colors.text} />
          </Animated.View>
        )}
        <Text
          style={[styles.title, { color: theme.colors.text, opacity: 0.8 }]}
        >
          {item.name}
        </Text>
        <Text style={[styles.desc, { color: theme.colors.text, opacity: 0.6 }]}>
          {item.description}
        </Text>
      </Pressable>
      {item.subGroups?.length > 0 && (
        <View style={styles.cardShadow}>
          <Animated.View
            layout={LinearTransition.springify()}
            style={[
              styles.subGroupWrapper,
              {
                marginTop: !isSubGroups ? -ITEM_HEIGHT / 2.4 : 0,
              },
            ]}
          >
            {item.subGroups.map((val, i) => (
              <SubGroupRender
                key={val.id}
                val={val}
                i={i}
                isSubGroups={isSubGroups}
              />
            ))}
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
};

const Main = () => {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition.springify()}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(val) => val.id}
      />
      <Image
        source={{
          uri: "https://www.ytechb.com/wp-content/uploads/2022/09/iPhone-14-Wallpaper-Blue.webp",
        }}
        style={styles.bgImage}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: GAP,
    margin: 20,
    paddingBottom: 20,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  groupListItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  subGroupWrapper: {
    position: "relative",
    width: "100%",
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  desc: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "500",
  },
  chevronIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    opacity: 0.8,
  },
});
