import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.hadoop.io.*;

public class AdsorptionIterReducer extends Reducer<Text, Text, Text, Text> {

	// NEED TO CHECK IF VALUES CONTAINS "interest" - this means that the key is an interest
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		// normalize weights and hard code origin to 1

		double sumOfWeights = 0.0;
		HashMap<String, Double> map = new HashMap<String, Double>();
		boolean isInterest = false;

		String valueToEmit = "";
		for (Text value: values) {
			if (value.toString().contains("*")) {
				valueToEmit = value.toString().substring(1);
			} else if (value.toString().equals("interest")) {
				isInterest = true;
			} else {
				String[] labelAndWeight = value.toString().split(",");
				String label = labelAndWeight[0];
				double weight = Double.valueOf(labelAndWeight[1]);
				sumOfWeights = sumOfWeights + weight;
				map.put(label, weight);
			}
		}

		String keyToEmit = "";
		if (isInterest) {
			keyToEmit = key.toString();
		} else {
			keyToEmit = key.toString();
		}
		
		if (map.isEmpty()) {
			context.write(new Text(keyToEmit), new Text(valueToEmit));
		} else {
			keyToEmit = keyToEmit + "-";
			String keyLatter = "";
			for (Map.Entry<String, Double> entry : map.entrySet()) {
				String strToAppend = "";
			    String label = entry.getKey();
			    double weight = entry.getValue();
			    double normWeight = weight / sumOfWeights;
			    
			    if (label.equals(key.toString())) {
			    	normWeight = 1.0;
			    }

			    if (keyLatter.length() == 0) {
			    	strToAppend = strToAppend + label + "," + Double.toString(normWeight);
			    	keyLatter = keyLatter + strToAppend;
			    } else {
			    	strToAppend = strToAppend + ";" + label + "," + Double.toString(normWeight);
			    	keyLatter = keyLatter + strToAppend;
			    }
			}

			keyToEmit = keyToEmit + keyLatter;

			context.write(new Text(keyToEmit), new Text(valueToEmit));
		}






	}
}