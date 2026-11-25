import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

const characters = [
  { id: "naina", name: "Naina", tag: "Emotional • Caring", emoji: "🌸", color: "#8E5CF6", intro: "Hey... I'm glad you're here. How was your day?" },
  { id: "kai", name: "Kai", tag: "Anime • Adventure", emoji: "⚔️", color: "#2878F0", intro: "Ready for an adventure? Our story begins now!" },
  { id: "maya", name: "Maya", tag: "Funny • Best friend", emoji: "✨", color: "#E76DAB", intro: "Finally! I was waiting. Tell me all the gossip!" },
  { id: "arjun", name: "Arjun", tag: "Mystery • Serious", emoji: "🌙", color: "#278F83", intro: "There is something I need to tell you..." }
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function openChat(character) {
    setSelected(character);
    setMessages([{ id: "welcome", from: "ai", text: character.intro }]);
  }
  function send() {
    const value = message.trim();
    if (!value) return;
    setMessages(old => [...old, { id: String(Date.now()), from: "user", text: value }]);
    setMessage("");
    // Demo reply only. Connect a secure backend + AI provider to enable real AI replies.
    setTimeout(() => setMessages(old => [...old, {
      id: String(Date.now() + 1), from: "ai",
      text: `That's interesting! Tell me more. I'm listening. 💜`
    }]), 450);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      {!selected ? (
        <FlatList
          contentContainerStyle={styles.container}
          ListHeaderComponent={
            <View>
              <Text style={styles.brand}>kavaana <Text style={styles.brandAccent}>ai</Text></Text>
              <Text style={styles.subtitle}>Your stories. Your characters. Your world.</Text>
              <View style={styles.hero}>
                <Text style={styles.heroEyebrow}>WELCOME TO YOUR UNIVERSE</Text>
                <Text style={styles.heroTitle}>Every conversation{"\n"}starts a new story.</Text>
                <Text style={styles.heroCopy}>Meet characters, explore new worlds and create stories together.</Text>
              </View>
              <Text style={styles.section}>Discover characters</Text>
            </View>
          }
          data={characters}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => openChat(item)}>
              <View style={[styles.avatar, {backgroundColor: item.color + "33"}]}>
                <Text style={styles.avatarEmoji}>{item.emoji}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterTag}>{item.tag}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={<Text style={styles.footer}>Kavaana AI • Demo starter • More features coming soon</Text>}
        />
      ) : (
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelected(null)}><Text style={styles.back}>‹ Back</Text></TouchableOpacity>
            <View style={{flex:1, alignItems:"center"}}>
              <Text style={styles.characterName}>{selected.emoji} {selected.name}</Text>
              <Text style={styles.characterTag}>Your story is live</Text>
            </View>
            <View style={{width:48}} />
          </View>
          <FlatList
            style={{flex:1}}
            contentContainerStyle={styles.chatList}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={[styles.bubble, item.from === "user" ? styles.userBubble : styles.aiBubble]}>
                <Text style={styles.bubbleText}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.composer}>
            <TextInput value={message} onChangeText={setMessage} placeholder="Write your message..." placeholderTextColor="#77758A" style={styles.input} onSubmitEditing={send} />
            <TouchableOpacity onPress={send} style={styles.send}><Text style={styles.sendText}>➤</Text></TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:"#0B0B14"},
  container:{padding:22,paddingBottom:36},
  brand:{fontSize:34,fontWeight:"900",color:"#FFFFFF",letterSpacing:-1},
  brandAccent:{color:"#A78BFA"},
  subtitle:{color:"#A6A4B8",fontSize:14,marginTop:4},
  hero:{backgroundColor:"#19152B",borderWidth:1,borderColor:"#332751",borderRadius:24,padding:22,marginTop:28,marginBottom:30},
  heroEyebrow:{color:"#B69AFF",fontSize:10,fontWeight:"800",letterSpacing:2},
  heroTitle:{color:"#FFFFFF",fontSize:27,fontWeight:"800",lineHeight:34,marginTop:14},
  heroCopy:{color:"#B7B2C9",fontSize:13,lineHeight:20,marginTop:12},
  section:{color:"#FFFFFF",fontSize:19,fontWeight:"800",marginBottom:14},
  card:{flexDirection:"row",alignItems:"center",backgroundColor:"#151521",borderRadius:18,padding:14,marginBottom:12,borderWidth:1,borderColor:"#29283A"},
  avatar:{width:54,height:54,borderRadius:16,alignItems:"center",justifyContent:"center",marginRight:14},
  avatarEmoji:{fontSize:27},
  characterName:{color:"#FFFFFF",fontSize:16,fontWeight:"800"},
  characterTag:{color:"#A6A4B8",fontSize:12,marginTop:4},
  arrow:{color:"#B69AFF",fontSize:30,paddingHorizontal:8},
  footer:{color:"#77758A",fontSize:11,textAlign:"center",marginTop:22},
  chatHeader:{height:66,flexDirection:"row",alignItems:"center",paddingHorizontal:18,borderBottomWidth:1,borderBottomColor:"#252437"},
  back:{color:"#B69AFF",fontSize:15,fontWeight:"700",width:48},
  chatList:{padding:18,gap:12,justifyContent:"flex-end"},
  bubble:{maxWidth:"84%",padding:14,borderRadius:18},
  aiBubble:{alignSelf:"flex-start",backgroundColor:"#201C31",borderBottomLeftRadius:5},
  userBubble:{alignSelf:"flex-end",backgroundColor:"#7651C9",borderBottomRightRadius:5},
  bubbleText:{color:"#FFFFFF",fontSize:15,lineHeight:21},
  composer:{flexDirection:"row",alignItems:"center",padding:14,borderTopWidth:1,borderTopColor:"#252437",gap:10},
  input:{flex:1,backgroundColor:"#191925",borderRadius:22,paddingHorizontal:17,paddingVertical:12,color:"#FFFFFF",fontSize:14},
  send:{width:46,height:46,borderRadius:23,backgroundColor:"#8B5CF6",alignItems:"center",justifyContent:"center"},
  sendText:{color:"#FFFFFF",fontSize:19}
});