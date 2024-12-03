import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from 'react';

const EditRound = () => {
  const { roundid, player1, player2, player3, player4 } = useLocalSearchParams<{ roundid: string, player1: string, player2: string, player3: string, player4: string }>();
  const [playerScores, setPlayerScores] = useState<{ player1: number, player2: number, player3: number, player4: number }>({
    player1: parseInt(player1) || 0,
    player2: parseInt(player2) || 0,
    player3: parseInt(player3) || 0,
    player4: parseInt(player4) || 0,
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    // Update the round data in the parent component or global state here
    // You could also call an API to save this data if needed
    setShowSaveModal(false);
    router.back();
  };

  const handleDelete = () => {
    // Logic for deleting the round
    setShowDeleteModal(false);
    router.back();
  };

  const handleInputChange = (player: keyof typeof playerScores, value: string) => {
    setPlayerScores({ ...playerScores, [player]: parseInt(value) || 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit / Delete</Text>
      <Text style={styles.subtitle}>Round #{roundid}</Text>

      {Object.keys(playerScores).map((player, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{player.replace('player', 'Player ')}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={playerScores[player as keyof typeof playerScores].toString()}
            onChangeText={(value) => handleInputChange(player as keyof typeof playerScores, value)}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
          <Text style={styles.buttonText}>Delete round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => setShowSaveModal(true)}>
          <Text style={styles.buttonText}>Save round</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel ⨉</Text>
      </TouchableOpacity>

      {/* Save Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showSaveModal}
        animationType="slide"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to save your changes?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setShowSaveModal(false)}>
                <Text style={styles.cancelText}>Cancel ⨉</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showDeleteModal}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this round?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.cancelText}>Cancel ⨉</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteConfirmButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#f76c6c',
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#8fbc8f',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#8fbc8f',
    padding: 10,
    borderRadius: 8,
  },
  deleteConfirmButton: {
    backgroundColor: '#f76c6c',
    padding: 10,
    borderRadius: 8,
  },
});

export default EditRound;
