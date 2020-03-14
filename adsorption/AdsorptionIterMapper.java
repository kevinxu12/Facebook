import org.apache.hadoop.mapreduce.*;
import java.io.IOException;

import org.apache.hadoop.io.*;

public class AdsorptionIterMapper extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String[] interestOrName = value.toString().split("\t");
		if (interestOrName[0].contains("-")) {
			String[] originAndLabelWeights = interestOrName[0].split("-");
			String origin = originAndLabelWeights[0];

			if (origin.contains("*")) {
				// this means that the origin is a interst/friend/affiliation - consider edges to be the users
				String labelWeights = originAndLabelWeights[1];
				String[] labelWeightsArr = labelWeights.split(";");
				String[] labelWeightsEdges = interestOrName[1].split(";");
				for (int i = 0; i < labelWeightsArr.length; i++) {
					String[] labelAndWeight = labelWeightsArr[i].split(",");
					String label = labelAndWeight[0];
					String weight = labelAndWeight[1];
					double weightOfLabel = Double.valueOf(weight);
					for (int j = 0; j < labelWeightsEdges.length; j++) {
						String[] labelAndWeightEdge = labelWeightsEdges[j].split(",");
						String labelEdge = labelAndWeightEdge[0];
						String labelWeight = labelAndWeightEdge[1];
						double weightOfLabelEdge = Double.valueOf(labelWeight);

						double weightToSend = weightOfLabel * weightOfLabelEdge;
						String keyToEmit = labelEdge;
						String valueToEmit = label + "," + Double.toString(weightToSend);
						context.write(new Text(keyToEmit), new Text(valueToEmit));
					}
				}

				context.write(new Text(origin), new Text("*" + interestOrName[1]));


			} else {
				String labelWeights = originAndLabelWeights[1];
				String[] labelWeightsArr = labelWeights.split(";");

				String[] labelWeightsEdges = interestOrName[1].split(";");


				for (int i = 0; i < labelWeightsArr.length; i++) {
					String[] labelAndWeight = labelWeightsArr[i].split(",");
					String label = labelAndWeight[0];
					String weight = labelAndWeight[1];
					double weightOfLabel = Double.valueOf(weight);
					for (int j = 0; j < labelWeightsEdges.length; j++) {
						String[] labelAndWeightEdge = labelWeightsEdges[j].split(",");
						String labelEdge = labelAndWeightEdge[0];
						String labelWeight = labelAndWeightEdge[1];
						double weightOfLabelEdge = Double.valueOf(labelWeight);

						double weightToSend = weightOfLabel * weightOfLabelEdge;
						String keyToEmit = "*" + labelEdge;
						String valueToEmit = label + "," + Double.toString(weightToSend);

						if (keyToEmit.contains("*")) {
							context.write(new Text(keyToEmit), new Text("interest"));
						}


						context.write(new Text(keyToEmit), new Text(valueToEmit));
					}
				}

				// emit special key/value so we can remember neighbors
				if (origin.contains("*")) {
					context.write(new Text(origin), new Text("interest"));
				}
				context.write(new Text(origin), new Text("*" + interestOrName[1]));
			}
			
		} else {
			// no values associated with origin
			String origin = interestOrName[0];
			String neighbors = interestOrName[1];

			// just need to emit special key/value to remember neighbors
			if (origin.contains("*")) {
				context.write(new Text(origin), new Text("interest"));
			}
			context.write(new Text(origin), new Text("*" + neighbors));
		}

	}
}