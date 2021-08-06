import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const result = await api.post(`repositories/${id}/like`);

    repositories.likes = result;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
            <FlatList 
              data={repositories}
              keyExtractor={repositorie => repositorie.id}
              renderItem={({ item: repositorie }) => (
                <>
                  <Text style={styles.repository}>{repositorie.title}</Text>
                  <Text style={styles.tech}>{repositorie.techs}</Text>
                  <Text style={styles.likeText}>{repositorie.likes} curtidas</Text>
                  
                  <View style={styles.likesContainer}>
                    <Text
                      style={styles.likeText}
                      // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                      testID={`repository-likes-${repositories.id}`}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(1)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${repositories.id}`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>

                </>
              )}
            />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    marginTop: 5
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 4
  },
});
