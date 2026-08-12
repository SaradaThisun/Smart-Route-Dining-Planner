import java.util.ArrayList;
import java.util.List;


public class RestaurantPriorityQueue {

    private List<Restaurant> heap;

    public RestaurantPriorityQueue() {
        heap = new ArrayList<>();
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public int size() {
        return heap.size();
    }

 
    public void insert(Restaurant restaurant) {
        heap.add(restaurant);
        heapifyUp(heap.size() - 1);
    }

   
    public Restaurant peek() {
        if (isEmpty()) {
            return null;
        }
        return heap.get(0);
    }

   
    public Restaurant extractMax() {
        if (isEmpty()) {
            return null;
        }
        Restaurant max = heap.get(0);
        Restaurant last = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, last);
            heapifyDown(0);
        }
        return max;
    }

   

    private int parent(int i) {
        return (i - 1) / 2;
    }

    private int leftChild(int i) {
        return 2 * i + 1;
    }

    private int rightChild(int i) {
        return 2 * i + 2;
    }

    private void swap(int i, int j) {
        Restaurant temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    
    private void heapifyUp(int index) {
        while (index > 0 &&
               heap.get(parent(index)).getOverallScore() < heap.get(index).getOverallScore()) {
            swap(index, parent(index));
            index = parent(index);
        }
    }

   
    private void heapifyDown(int index) {
        int largest = index;
        int left = leftChild(index);
        int right = rightChild(index);

        if (left < heap.size() &&
            heap.get(left).getOverallScore() > heap.get(largest).getOverallScore()) {
            largest = left;
        }
        if (right < heap.size() &&
            heap.get(right).getOverallScore() > heap.get(largest).getOverallScore()) {
            largest = right;
        }
        if (largest != index) {
            swap(index, largest);
            heapifyDown(largest);
        }
    }
}
