import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Category } from '../types/Task';

interface CategoryItemProps {
  item: Category;
  handleSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, handleSelectCategory, selectedCategory }) => {
  const isSelected = item.value === selectedCategory;

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={() => handleSelectCategory(item.value)}
    >
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  selected: {
    borderColor: 'blue', // Cor da borda para a categoria selecionada
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryItem;
