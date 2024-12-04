import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from 'react';
import { useGameContext } from '../../GameContext'; // Import game context

const EditRound = () => {
  const { roundid, player1, player2, player3, player4 } = useLocalSearchParams<{ roundid: string, player1: string, player2: string, player3: string, player4: string }>();
  const { updateRound, deleteRound } = useGameContext(); // Destructure updateRound and deleteRound from game context

  const [playerScores, setPlayerScores] = useState<Record<'player1' | 'player2' | 'player3' | 'player4', number>>({
    player1: parseInt(player1) || 0,
    player2: parseInt(player2) || 0,
    player3: parseInt(player3) || 0,
    player4: parseInt(player4) || 0,
  });

  // Modal visibility states
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleSave = () => {
    setSaveModalVisible(true);
  };

  const confirmSave = () => {
    updateRound(roundid, [
      playerScores.player1,
      playerScores.player2,
      playerScores.player3,
      playerScores.player4,
    ]);
    setSaveModalVisible(false);
    router.push({ pathname: "../[gameid]", params: { gameid: roundid } });
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    deleteRound(roundid);
    setDeleteModalVisible(false);
    router.push({ pathname: "../[gameid]", params: { gameid: roundid } });
  };

  const handleInputChange = (player: 'player1' | 'player2' | 'player3' | 'player4', value: string) => {
    setPlayerScores({ ...playerScores, [player]: parseInt(value) || 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit / Delete</Text>
      <Text style={styles.subtitle}>Round #{roundid}</Text>

      {Object.keys(playerScores).map((player) => (
        <View key={player} style={styles.inputContainer}>
          <Text style={styles.label}>{player.replace('player', 'Player ')}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={playerScores[player as 'player1' | 'player2' | 'player3' | 'player4'].toString()}
            onChangeText={(value) => handleInputChange(player as 'player1' | 'player2' | 'player3' | 'player4', value)}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save round</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel ⨉</Text>
      </TouchableOpacity>

      {/* Save Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSaveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation - Edit</Text>
            <Text>Are you sure you want to save your changes?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setSaveModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmSave}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmation - Delete</Text>
            <Text>Are you sure you want to delete this round?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteConfirmButton} onPress={confirmDelete}>
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
    padding: 16,
    justifyContent: 'center',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#8fbc8f',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  deleteConfirmButton: {
    backgroundColor: '#f76c6c',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
});

export default EditRound;
