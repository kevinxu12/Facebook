import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;
import java.util.LinkedList;

import org.apache.hadoop.io.*;

public class AdsorptionInitReducer extends Reducer<Text, Text, Text, Text> {
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		
		double numInterestsOrNames = 0.0; 
		LinkedList<String> interestsOrNames = new LinkedList<String>();
		for (Text value: values) {
			String interestOrName = value.toString();
			interestsOrNames.push(interestOrName);
			numInterestsOrNames++;

		}

		double weightEdge = 1.0 / numInterestsOrNames;
		String keyToEmit = "";
		if (key.toString().contains("*")) {
			keyToEmit = keyToEmit + key.toString();

		} else {
			keyToEmit = keyToEmit + key.toString() + '-' + key.toString() + "," + Integer.toString(1);
		}
		String valueToEmit = "";
		while (!interestsOrNames.isEmpty()) {
			String interestOrNameToAdd = interestsOrNames.pollFirst();
			String stringAppend = "";
			if (valueToEmit.length() == 0) {
				stringAppend = stringAppend + interestOrNameToAdd + ',' + Double.toString(weightEdge);
				valueToEmit = valueToEmit + stringAppend;
			} else {
				stringAppend = stringAppend + ";" + interestOrNameToAdd + ',' + Double.toString(weightEdge);
				valueToEmit = valueToEmit + stringAppend;
			}
		}

		context.write(new Text(keyToEmit), new Text(valueToEmit));
	}
}